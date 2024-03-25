import fetch from '@/api/fetch';

/**
 * 更新用户名
 * @param params
 */
export const patchUserName = (params: User) => {
  return fetch.patch(`/user/username`, {
    ...params,
  });
};
/**
 * 更新QQ
 * @param params
 */
export const patchQQ = (user: User, QQ: string) => {
  return fetch.patch(`/user/qq?qq=${QQ}`, {
    ...user,
  });
};
/**
 * 更新用户密码
 * @param user
 * @param password
 *
 */
export const patchPassword = (user: User, password: string) => {
  return fetch.patch(`/user/password?password=${password}`, {
    ...user,
  });
};



/**
 * 用户名模糊搜索用户
 * @param username
 */
export function getUsersByName(username: string) {
  return fetch.get(`/user/findByName?username=${username}`);
}

/**
 * 用户头像上传
 * @param params
 */
export function setUserAvatar(params: FormData) {
  return fetch.post(`/user/avatar`, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

/**
 * 删除用户
 * @param params
 */
export function deleteUser(params: any) {
  return fetch.delete(`/user`, { params: params });
}
