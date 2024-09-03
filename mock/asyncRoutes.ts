// 模拟后端动态生成路由
import { defineFakeRoute } from "vite-plugin-fake-server/client";

/**
 * roles：页面级别权限，这里模拟二种 "admin"、"common"
 * admin：管理员角色
 * common：普通角色
 */
const permissionRouter = {
  path: "/permission",
  meta: {
    title: "权限管理",
    icon: "ep:lollipop",
    rank: 10
  },
  children: [
    {
      path: "/permission/page/index",
      name: "PermissionPage",
      meta: {
        title: "页面权限",
        roles: ["admin", "common"]
      }
    },
    {
      path: "/permission/button",
      meta: {
        title: "按钮权限",
        roles: ["admin", "common"]
      },
      children: [
        {
          path: "/permission/button/router",
          component: "permission/button/index",
          name: "PermissionButtonRouter",
          meta: {
            title: "路由返回按钮权限",
            auths: [
              "permission:btn:add",
              "permission:btn:edit",
              "permission:btn:delete"
            ]
          }
        },
        {
          path: "/permission/button/login",
          component: "permission/button/perms",
          name: "PermissionButtonLogin",
          meta: {
            title: "登录接口返回按钮权限"
          }
        }
      ]
    }
  ]
};

const testPageRouter = {
  path: "/test",
  meta: {
    title: "测试页",
    icon: "ri:test-tube-line",
    rank: 10
  },
  children: [
    {
      path: "/test/upload/index",
      name: "UploadTestPage",
      icon: "ep:upload",

      meta: {
        title: "上传-Upload",
        roles: ["admin", "common"]
      },
      children: [
        {
          path: "/test/upload/index",
          component: "test/upload/index",
          name: "UploadTest",
          meta: {
            title: "上传测试-文件流"
          }
        }
      ]
    },
    {
      path: "/test/select/index",
      name: "SelectTest",
      meta: {
        title: "选择器-Select",
        roles: ["admin", "common"]
      },
      children: [
        {
          path: "/test/select/index",
          component: "test/select/index",
          name: "SelectTest",
          meta: {
            title: "选择器-类型差异"
          }
        }
      ]
    }
  ]
};

export default defineFakeRoute([
  {
    url: "/get-async-routes",
    method: "get",
    response: () => {
      return {
        success: true,
        data: [permissionRouter, testPageRouter]
      };
    }
  }
]);
