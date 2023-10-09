import Service from "../../services";
import { testMode } from "../../config";

const service = new Service();

const _apiBase = testMode 
? 'https://request.sibgenco.local/ams_api_tst'
: 'https://request.sibgenco.local/ams_api';

// export const getStaffbookData = ( data ) => service.getResource(`${_apiBase}/?q=staffdata&row_from=${data.row_from}&row_num=${data.row_num}`, data.api_key);
// export const uploadFile = ( data ) => service.uploadFile(`${_apiBase}/?q=uploadfile`, data);
// export const uplodeData = ( data ) => service.postResource(`${_apiBase}/?q=staffdata`, data);

export const test = ( data ) => service.getResource(`${_apiBase}/?q=test`, data);
