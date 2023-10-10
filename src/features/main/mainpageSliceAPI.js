import Service from "../../services";
import { testMode } from "../../config";

const service = new Service();

const _apiBase = testMode 
  ? 'https://request.sibgenco.local/ams_api_tst'
  : 'https://request.sibgenco.local/ams_api';

export const getRemoteUser = ( data ) => service.getResource(`${_apiBase}/?q=remoteuser`, data);
export const getUserData = ( data ) => {
  const mode = data.app12_id ? `&app12_id=${data.app12_id}` : `&login=${data.login}`;
  return service.getResource(`${_apiBase}/?q=user${mode}`, data)
}
export const setUserLang = ( data ) => service.updateResource(`${_apiBase}/?q=user`, data);
export const searchUsers = ( data ) => {
  const string = data.string ? data.string : '';
  const author_id = data.author_id ? data.author_id : '';
  return service.getResource(`${_apiBase}/?q=users&string=${string}&author_id=${author_id}`, data)
}