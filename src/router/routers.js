import Main from '@/components/main'
// import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  {
    path: '/error_logger',
    name: 'error_logger',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'error_logger_page',
        name: 'error_logger_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/view/single-page/error-logger.vue')
      }
    ]
  },
  {
    'path': '/article',
    'name': 'wenzhangguanli',
    'meta': {
      'icon': 'logo-buffer',
      'title': '文章管理',
      'access': [
        1
      ]
    },
    'component': Main,
    'children': [
      {
        'path': 'list',
        'name': 'wenzhangliebiao',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '文章列表',
          'access': [
            2
          ]
        },
        'component': () => import('@/view/article/list.vue')
      },
      {
        'path': 'add',
        'name': 'tianjiawenzhang',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '添加文章',
          'access': [
            3
          ]
        },
        'component': () => import('@/view/article/add.vue')
      },
      {
        'path': 'class',
        'name': 'lanmuguanli',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '栏目管理',
          'access': [
            4
          ]
        },
        'component': () => import('@/view/article/class.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'huishouzhan',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '回收站',
          'access': [
            5
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'jiaochengpingjia',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '教程评价',
          'access': [
            112
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'jiaochengyuedu',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '教程阅读',
          'access': [
            114
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      }
    ]
  },
  {
    'path': '/components',
    'name': 'houtaiyonghu',
    'meta': {
      'icon': 'logo-buffer',
      'title': '后台用户',
      'access': [
        6
      ]
    },
    'component': Main,
    'children': [
      {
        'path': 'tree_select_page',
        'name': 'zuzhijiagou',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '组织架构',
          'access': [
            7
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'gangweijiagou',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '岗位架构',
          'access': [
            8
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'tianjiayuangong',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '添加员工',
          'access': [
            44
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      }
    ]
  },
  {
    'path': '/components',
    'name': 'dianpuguanli',
    'meta': {
      'icon': 'logo-buffer',
      'title': '店铺管理',
      'access': [
        9
      ]
    },
    'component': Main,
    'children': [
      {
        'path': 'tree_select_page',
        'name': 'dianpuliebiao',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '店铺列表',
          'access': [
            10
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'hangyefenlei',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '行业分类',
          'access': [
            128
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'hangyefenlei',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '供应商分类',
          'access': [
            129
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'xiaoguotuzhizuo',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '效果图制作',
          'access': [
            135
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'cad用户关系',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': 'CAD用户关系',
          'access': [
            147
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      }
    ]
  },
  {
    'path': '/components',
    'name': 'zizhishenhe',
    'meta': {
      'icon': 'logo-buffer',
      'title': '资质审核',
      'access': [
        11
      ]
    },
    'component': Main,
    'children': [
      {
        'path': 'tree_select_page',
        'name': 'shiwushangpinjiaoyi',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '实物商品交易',
          'access': [
            12
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'xunishangpinjiaoyi',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '虚拟商品交易',
          'access': [
            13
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'shejifuwu',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '设计服务',
          'access': [
            14
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'shengchanjiagong',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '生产加工',
          'access': [
            15
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'shigongfuwu',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '施工服务',
          'access': [
            16
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'wuliufuwu',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '物流服务',
          'access': [
            17
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'peixunfuwu',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '培训服务',
          'access': [
            18
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      }
    ]
  },
  {
    'path': '/components',
    'name': 'yonghuguanli',
    'meta': {
      'icon': 'logo-buffer',
      'title': '用户管理',
      'access': [
        19
      ]
    },
    'component': Main,
    'children': [
      {
        'path': 'tree_select_page',
        'name': 'yonghutianjia',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '用户添加',
          'access': [
            20
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'yonghuguanli',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '用户管理',
          'access': [
            21
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'shimingrenzheng',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '实名认证',
          'access': [
            22
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'dengluredian',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '登录热点',
          'access': [
            51
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'jihuoma',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '激活码',
          'access': [
            118
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      }
    ]
  },
  {
    'path': '/components',
    'name': 'shangpinguanli',
    'meta': {
      'icon': 'logo-buffer',
      'title': '商品管理',
      'access': [
        23
      ]
    },
    'component': Main,
    'children': [
      {
        'path': 'tree_select_page',
        'name': 'shangpinliebiao',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '商品列表',
          'access': [
            24
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      }
    ]
  },
  {
    'path': '/components',
    'name': 'tuiguangguanli',
    'meta': {
      'icon': 'logo-buffer',
      'title': '推广管理',
      'access': [
        25
      ]
    },
    'component': Main,
    'children': [
      {
        'path': 'tree_select_page',
        'name': 'guanggaoshenhe',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '广告审核',
          'access': [
            26
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'guanggaotianjia',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '广告添加',
          'access': [
            134
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      }
    ]
  },
  {
    'path': '/components',
    'name': 'dianpuyunpan',
    'meta': {
      'icon': 'logo-buffer',
      'title': '店铺云盘',
      'access': [
        29
      ]
    },
    'component': Main,
    'children': [
      {
        'path': 'tree_select_page',
        'name': 'yunpanliebiao',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '云盘列表',
          'access': [
            30
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'kongjianwenjian',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '空间文件',
          'access': [
            48
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      }
    ]
  },
  {
    'path': '/components',
    'name': 'zijinguanli',
    'meta': {
      'icon': 'logo-buffer',
      'title': '资金管理',
      'access': [
        31
      ]
    },
    'component': Main,
    'children': [
      {
        'path': 'tree_select_page',
        'name': 'zhuanzhangguanli',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '转账管理',
          'access': [
            32
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'tixianguanli',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '提现管理',
          'access': [
            33
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'dingjiajihua',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '定价计划',
          'access': [
            41
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'chongzhizengsong',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '充值赠送',
          'access': [
            50
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'chongzhika',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '充值卡',
          'access': [
            68
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'zijinzhangben',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '资金账本',
          'access': [
            79
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'chongzhiliushui',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '充值流水',
          'access': [
            87
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'chongzhihuizong',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '充值汇总',
          'access': [
            96
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'shougongzhang',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '手工帐',
          'access': [
            97
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'hongbaoguanli',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '红包管理',
          'access': [
            103
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'jilianghuizong',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '积量汇总',
          'access': [
            109
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'zhifufangan',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '支付方案',
          'access': [
            111
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'tixianpeizhi',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '提现配置',
          'access': [
            140
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'zhangmuhuizong',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '账目汇总',
          'access': [
            142
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      }
    ]
  },
  {
    'path': '/components',
    'name': 'jishitongxun',
    'meta': {
      'icon': 'logo-buffer',
      'title': '及时通讯',
      'access': [
        34
      ]
    },
    'component': Main,
    'children': [
      {
        'path': 'tree_select_page',
        'name': 'guangboxiaoxi',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '广播消息',
          'access': [
            35
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'jishixiaoxi',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '及时消息',
          'access': [
            67
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      }
    ]
  },
  {
    'path': '/components',
    'name': 'pinpaiguanli',
    'meta': {
      'icon': 'logo-buffer',
      'title': '品牌管理',
      'access': [
        36
      ]
    },
    'component': Main,
    'children': [
      {
        'path': 'tree_select_page',
        'name': 'pinpailiebiao',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '品牌列表',
          'access': [
            37
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'pinpaishenhe',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '品牌审核',
          'access': [
            38
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      }
    ]
  },
  {
    'path': '/components',
    'name': 'xitongguanli',
    'meta': {
      'icon': 'logo-buffer',
      'title': '系统管理',
      'access': [
        39
      ]
    },
    'component': Main,
    'children': [
      {
        'path': 'tree_select_page',
        'name': 'wangzhanweihu',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '网站维护',
          'access': [
            40
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'shangpinleimu',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '商品类目',
          'access': [
            42
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'leimushuxing',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '类目属性',
          'access': [
            43
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'zhujijiankong',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '主机监控',
          'access': [
            47
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'huancunguanli',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '缓存管理',
          'access': [
            49
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'weixinhuifu',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '微信回复',
          'access': [
            83
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'gengduogongju',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '更多工具',
          'access': [
            86
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'caidanshezhi',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '菜单设置',
          'access': [
            102
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'wangzhandaohang',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '网站导航',
          'access': [
            107
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'wangzhanxieyi',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '网站协议',
          'access': [
            108
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'gonggao',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '公告',
          'access': [
            110
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'yuyinhecheng',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '语音合成',
          'access': [
            113
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      }
    ]
  },
  {
    'path': '/components',
    'name': 'dingdanguanli',
    'meta': {
      'icon': 'logo-buffer',
      'title': '订单管理',
      'access': [
        45
      ]
    },
    'component': Main,
    'children': [
      {
        'path': 'tree_select_page',
        'name': 'shangpindingdan',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '商品订单',
          'access': [
            46
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': null,
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '仓库管理',
          'access': [
            126
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'changkudingdang',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '仓库订单',
          'access': [
            127
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      }
    ]
  },
  {
    'path': '/components',
    'name': 'rizhiguanli',
    'meta': {
      'icon': 'logo-buffer',
      'title': '日志管理',
      'access': [
        52
      ]
    },
    'component': Main,
    'children': [
      {
        'path': 'tree_select_page',
        'name': 'ruanjianrizhi',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '软件日志',
          'access': [
            53
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'ERPrizhi',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': 'ERP日志',
          'access': [
            54
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'xiaoxiduilie',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '消息队列',
          'access': [
            55
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'weixinrizhi',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '微信日志',
          'access': [
            56
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'duanxinrizhi',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '短信日志',
          'access': [
            57
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'houtaicaozuo',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '后台操作',
          'access': [
            58
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'ruanjianyouhua',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '软件优化',
          'access': [
            90
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'duizhangrizhi',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '对账日志',
          'access': [
            95
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'hongbaorizhi',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '红包日志',
          'access': [
            106
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'cadrizhi',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': 'CAD日志',
          'access': [
            136
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'tonghuarizhi',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '通话日志',
          'access': [
            144
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'rizhifenxi',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '日志分析',
          'access': [
            148
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      }
    ]
  },
  {
    'path': '/components',
    'name': 'luntanguanli',
    'meta': {
      'icon': 'logo-buffer',
      'title': '论坛管理',
      'access': [
        61
      ]
    },
    'component': Main,
    'children': [
      {
        'path': 'tree_select_page',
        'name': 'bankuaiguanli',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '板块管理',
          'access': [
            62
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'jiaoseguanli',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '角色管理',
          'access': [
            63
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'tieziliebiao',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '帖子列表',
          'access': [
            64
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'yonghuliebiao',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '用户列表',
          'access': [
            65
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      }
    ]
  },
  {
    'path': '/components',
    'name': 'renwuguanli',
    'meta': {
      'icon': 'logo-buffer',
      'title': '任务管理',
      'access': [
        69
      ]
    },
    'component': Main,
    'children': [
      {
        'path': 'tree_select_page',
        'name': 'renwudingjia',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '任务定价',
          'access': [
            70
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'renwuliebiao',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '任务列表',
          'access': [
            71
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'pingjiapeizhi',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '评价配置',
          'access': [
            75
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'chengchangguize',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '成长规则',
          'access': [
            77
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'renwuleixing',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '任务类型',
          'access': [
            82
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      }
    ]
  },
  {
    'path': '/components',
    'name': 'fanliguanli',
    'meta': {
      'icon': 'logo-buffer',
      'title': '返利管理',
      'access': [
        72
      ]
    },
    'component': Main,
    'children': [
      {
        'path': 'tree_select_page',
        'name': 'fanliliushui',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '返利流水',
          'access': [
            73
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'fanlibili',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '返利比例',
          'access': [
            74
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'jingxiaoshangguize',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '经销商规则',
          'access': [
            76
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'yaoqinglian',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '邀请链',
          'access': [
            78
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'jingxiaoshang',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '经销商',
          'access': [
            81
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'yewuyuanfanli',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '业务员返利',
          'access': [
            84
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'chengshifenxiao',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '城市分销',
          'access': [
            119
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'cadjingxiaoshang',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': 'CAD经销商',
          'access': [
            146
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'mendianshouquan',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '门店授权',
          'access': [
            149
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      }
    ]
  },
  {
    'path': '/components',
    'name': 'youhuaruanjian',
    'meta': {
      'icon': 'logo-buffer',
      'title': '优化软件',
      'access': [
        88
      ]
    },
    'component': Main,
    'children': [
      {
        'path': 'tree_select_page',
        'name': 'youhuashuju',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '优化数据',
          'access': [
            89
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'yixingzaoxing',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '异形造型',
          'access': [
            105
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': null,
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '开料配置类型',
          'access': [
            130
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': null,
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '开料配置',
          'access': [
            131
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': null,
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '用户收费开料配置',
          'access': [
            132
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      }
    ]
  },
  {
    'path': '/components',
    'name': 'fapiaoguanli',
    'meta': {
      'icon': 'logo-buffer',
      'title': '发票管理',
      'access': [
        93
      ]
    },
    'component': Main,
    'children': [
      {
        'path': 'tree_select_page',
        'name': 'kaipiaoguanli',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '开票管理',
          'access': [
            91
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'chuzhangrizhi',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '出账日志',
          'access': [
            94
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      }
    ]
  },
  {
    'path': '/components',
    'name': 'fengyunjifei',
    'meta': {
      'icon': 'logo-buffer',
      'title': '丰云计费',
      'access': [
        98
      ]
    },
    'component': Main,
    'children': [
      {
        'path': 'tree_select_page',
        'name': 'chaidanliushui',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '拆单流水',
          'access': [
            60
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'chaidanhuizong',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '拆单汇总',
          'access': [
            66
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'ruanjianbaoyue',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '软件包月',
          'access': [
            99
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'zengzhifuwu',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '增值服务',
          'access': [
            100
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      }
    ]
  },
  {
    'path': '/components',
    'name': 'ERPguangli',
    'meta': {
      'icon': 'logo-buffer',
      'title': 'ERP管理',
      'access': [
        101
      ]
    },
    'component': Main,
    'children': [
      {
        'path': 'tree_select_page',
        'name': 'ERPdingdan',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': 'ERP订单',
          'access': [
            115
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'mendiankehu',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '门店客户',
          'access': [
            116
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'shoukuanjilu',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '收款记录',
          'access': [
            117
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'erppeizhi',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': 'ERP配置',
          'access': [
            141
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      }
    ]
  },
  {
    'path': '/components',
    'name': 'huodongguangli',
    'meta': {
      'icon': 'logo-buffer',
      'title': '活动管理',
      'access': [
        120
      ]
    },
    'component': Main,
    'children': [
      {
        'path': 'tree_select_page',
        'name': 'huodongliebiao',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '活动列表',
          'access': [
            121
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'zhongjiangliebiao',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '中奖列表',
          'access': [
            122
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'choujianfangshi',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '抽奖方式',
          'access': [
            123
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'chuangjianhuodong',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '创建活动',
          'access': [
            124
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'youhuiquan',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '优惠券',
          'access': [
            133
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      }
    ]
  },
  {
    'path': '/components',
    'name': 'chenfengjinrong',
    'meta': {
      'icon': 'logo-buffer',
      'title': '晨丰金融',
      'access': [
        138
      ]
    },
    'component': Main,
    'children': [
      {
        'path': 'tree_select_page',
        'name': 'fegshoudai',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '丰收贷',
          'access': [
            137
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'jinrongpeizhi',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '金融配置',
          'access': [
            139
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      },
      {
        'path': 'tree_select_page',
        'name': 'jinrongmingxi',
        'meta': {
          'icon': 'md-arrow-dropdown-circle',
          'title': '金融明细',
          'access': [
            143
          ]
        },
        'component': () => import('@/view/components/tree-select/index.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
