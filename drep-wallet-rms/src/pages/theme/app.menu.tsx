/**
 * 菜单
 * @author 
 * @create 
 */

const AppMenu = [
    {
        name: "系统配置",
        url: "",
        icon: "ordered-list",
        key: "system",
        children: [
            {
                name: "角色列表",
                url: "/drep/role",
                children: [],
                key: "system-list"
            },
            {
                name: "组织列表",
                url: "/drep/organization",
                children: [],
                key: "system-organizationlist"
            },
            {
                name: "管理员列表",
                url: "/drep/admin",
                children: [],
                key: "system-adminlist"
            }
        ]
    },
    {
        name: "用户管理",
        url: "",
        icon: "ordered-list",
        key: "manpage",
        children: [
            {
                name: "用户列表",
                url: "/leo/commodity",
                children: [],
                key: "manpage-user"
            },
            {
                name: "用户关系表",
                url: "/leo/commodity/min",
                children: [],
                key: "manpage-relationship"
            },
            {
                name: "实名审核表",
                url: "/leo/commodity/min",
                children: [],
                key: "manpage-audit"
            }
        ]
    },
    {
        name: "经营活动",
        url: "",
        icon: "shopping-cart",
        key: "operat",
        children: [
            {
                name: "活动配置",
                url: "/drep/conf",
                children: [],
                key: "operat-conf"
            },
            {
                name: "领取列表",
                url: "/drep/esay",
                children: [],
                key: "operat-easy"
            }
        ]
    },
    {
        name: "财务中心",
        url: "",
        icon: "shopping-cart",
        key: "finance",
        children: [
            {
                name: "币种管理",
                url: "/leo/commodity",
                children: [],
                key: "finance-CurrencyManage"
            },
            {
                name: "平台资产",
                url: "/leo/commodity/min",
                children: [],
                key: "1"
            },
            {
                name: "提笔审核",
                url: "/leo/commodity",
                children: [],
                key: "2"
            },
            {
                name: "充值管理",
                url: "/leo/commodity/min",
                children: [],
                key: "3"
            },
            {
                name: "锁仓记录",
                url: "/leo/commodity",
                children: [],
                key: "4"
            },
            {
                name: "SWAP 记录",
                url: "/leo/commodity/min",
                children: [],
                key: "5"
            },
            {
                name: "财务流水",
                url: "/leo/commodity/min",
                children: [],
                key: "6"
            }
        ]
    },

];


export { AppMenu };
