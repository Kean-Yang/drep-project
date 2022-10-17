
// // 流程首页query
// export interface IPageFilter {
//     id?: string;
//     remark?: string;
//     status?: string;
//     pageNum?: number;
//     pageSize?: number;
// }

// // 页面信息查询
// export interface IPageData {
//     infoRespList: IPageTableData[];
//     totalElements: number;
// }
// export interface IPageTableData {
//     id: string;
//     name: string;
//     url: string;
//     pageFunction: string;
//     insuranceName: string;
//     templateInfo: string;
// }

// // 新建页面
// export interface AddIPageSave {
//     isMiddlePage: boolean;
//     pageContentName: string;
//     pageId: string;
//     pageThemeId: string;
//     questionId: string;
//     remark: string;
// }


// 登陆
export interface ILoginParam {
    username: string;
    password: string;
    remember: boolean;
    expression: any;
    validate:any;
    validateInput: any;
}
