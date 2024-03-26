import fetch from '@/api/fetch';
import axios, { AxiosInstance } from 'axios';
/**
 * {
 *  id = 5
 * }
 * @param params
 */
export async function getSiteWebInfo(params = {id:5}) {
  return await fetch.get(`/kv/key-value/query`, { params: params });
}

/**
 * {
 *  id = 5
 * }
 * @param params
 */
export async function uploadImage(formData: any) {
    return await axios.post('/image/upload', formData,{
      headers: {
        Authorization:'9ElAXIX2ovSWbC7BkDXYnKkt3feFauB7'
      }
    });
}
