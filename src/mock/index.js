import Mock from "mockjs2"
import {generatorResponse, generatorToken, getRequestBody, getRolePermission} from "@/mock/tool";
import menuList from './service/menuList.json'
import menuTree from './service/menuTree.json'

const useMock = true

if (useMock) {

  /**
   * 登录接口
   */
  const login = request => {
    const {username, password} = getRequestBody(request)
    const admin = {
      username: 'admin',
      password: 'admin'
    }
    if ((username === admin.username && password === admin.password) || username !== admin.username) {
      localStorage.setItem('user_role', username)
      const userInfo = {
        'id': Math.random().toString(36).slice(2),
        'username': username,
        'password': password,
        'token': generatorToken(),
        'avatar': 'https://portrait.gitee.com/uploads/avatars/user/1611/4835367_Jmysy_1578975358.png',
        'permissions': getRolePermission(username === admin.username)
      }
      return generatorResponse(userInfo)
    } else {
      return generatorResponse(null, '账号或密码错误', 500)
    }
  }


  /**
   * 菜单接口
   */
  const getUserMenusArray = request => {
    const filters = ['form']
    const userName = localStorage.getItem('user_role')
    const menus = userName === 'admin' ? menuList : menuList.filter(m => (!filters.includes(m.name) && !filters.includes(m.parent)))
    return generatorResponse(menus)
  }

  /**
   * 菜单接口
   */
  const getUserMenusTree = request => {
    const filters = ['list', 'form']
    const userName = localStorage.getItem('user_role')
    const menus = userName === 'admin' ? menuTree : menuTree.filter(m => !filters.includes(m.name))
    return generatorResponse(menus)
  }

  /**
   * 注销接口
   */
  const logout = request => {
    return generatorResponse({
      status: 0
    })
  }
  function formatResponse(data) {
    return {
      errcode: 0,
      errmsg: "ok",
      data: data
    }
  }

  /**
   *
   * getTableList
   */

  const getTableList = request => {
    const total = 43
    const parameters = getRequestBody(request)
    const result = []
    const current = parseInt(parameters.current)
    const pageSize = parseInt(parameters.pageSize)
    const totalPage = Math.ceil(total / pageSize)
    const key = (current - 1) * pageSize
    const next = (current >= totalPage ? (total % pageSize) : pageSize) + 1

    for (let i = 1; i < next; i++) {
      const tmpKey = key + i
      result.push({
        key: tmpKey,
        name: "Joe Black",
        sex: "boy",
        age: 32,
        createTime: "2020-02-09 00:00:00",
        address: "Sidney No. 1 Lake Park Sidney No. 1 ",
        tags: ["cool", "teacher"]
      })
    }
    const data = {
      pageSize: pageSize,
      current: current,
      totalCount: total,
      totalPage: totalPage,
      nodes: result
    }
    return formatResponse(data)
  }


  /**
   * 总数统计
   *
   */
  const getAreaAllDataCount = request => {
    const data = {
      carCount: 20961, // 企业总数
      companyCount: 1295, // 车辆总数
      practitionerCount: 8741, // 从业人员
      safeOfficerCount: 1883 // 安全员丛书
    }
    return formatResponse(data)
  }

  /**
   * 企业占比
   */
  const getFocusCompanyMonthFive = request => {
    const data = {
      heavyCargoCount: 39, // 重型货运
      onlineCargoCount: 1, // 网络货运
      ordinaryCargoCount: 63, // 普货
      riskChemicalCount: 15, // 危化
      specialPurposeCount: 44 // 专用
    }
    return formatResponse(data)
  }

  /**
   * 消息通知
   */
  const getNewsNoticeTypeCount = request => {
    const data = {
      todayIncreaseNewsCount: 1, // 新增待处理
      unDealNewsCount: 2, // 待处理
      goodsNewCenterPoList: [
        {
          companyId: 124,
          conditionId: 292,
          createTime: "2023-05-23 09:42:50",
          title: "【企业诉求】成都融运运输有限公司发起企业诉求，请尽快查看并回复。",
          type: "MESSAGE",
          updateTime: "2023-05-23 09:42:50"
        },
        {
          companyId: 312,
          conditionId: 290,
          createTime: "2023-05-22 18:04:54",
          title: "【企业诉求】四川路鲲新能源有限公司发起企业诉求，请尽快查看并回复。",
          type: "MESSAGE",
          updateTime: "2023-05-22 18:04:54"
        }
      ]
    }
    return formatResponse(data)
  }

  /**
   * 重点关注企业列表
   */
  const totalCount = 5701

  const getFocusCompany = request => {
    const parameters = getRequestBody(request)

    const result = []
    const current = parseInt(parameters.current)
    const pageSize = parseInt(parameters.pageSize)
    const totalPage = Math.ceil(totalCount / pageSize)
    const key = (current - 1) * pageSize
    const next = (current >= totalPage ? (totalCount % pageSize) : pageSize) + 1

    for (let i = 1; i < next; i++) {
      const tmpKey = key + i
      result.push({
        companyId: tmpKey,
        companyName: '四川泰吉达物流有限公司' + tmpKey,
        businessStatus: '营业',
        type: '危化',
        dutyPerson: '张三' + tmpKey,
        legalDelegates: '李四' + tmpKey,
        updatedAt: Mock.mock('@datetime'),
        editable: false
      })
    }
    const data = {
      pageSize: pageSize,
      current: current,
      totalCount: totalCount,
      totalPage: totalPage,
      nodes: result
    }
    return formatResponse(data)
  }


  Mock.mock(/\/api\/login/, 'post', login)
  Mock.mock(/\/api\/logout/, 'post', logout)
  Mock.mock(/\/api\/getUserMenusArray/, 'post', getUserMenusArray)
  Mock.mock(/\/api\/getUserMenusTree/, 'post', getUserMenusTree)
  Mock.mock(/\/api\/getTableList/, 'post', getTableList)
  Mock.mock(/\/api\/getAreaAllDataCount/, 'get', getAreaAllDataCount)
  Mock.mock(/\/api\/getFocusCompanyMonthFive/, 'get', getFocusCompanyMonthFive)
  Mock.mock(/\/api\/getNewsNoticeTypeCount/, 'get', getNewsNoticeTypeCount)
  Mock.mock(/\/api\/getFocusCompany/, 'post', getFocusCompany)

  Mock.setup({
    timeout: 1000
  })
}

