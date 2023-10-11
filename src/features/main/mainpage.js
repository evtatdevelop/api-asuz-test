import React, { useEffect } from "react";
import './mainpage.scss';
import { useSelector, useDispatch } from "react-redux";
import { remoteUser, getUserId, getUserLogin, setLang, searchUser } from "./mainpageSlice";
import { getMainpage, addToPrefers, delToPrefers } from "./mainpageSlice";
import { tests } from "./mainpageSlice";
import { TestLoader } from "./testLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faBan, } from '@fortawesome/free-solid-svg-icons'

export const MainPage = () => {

  const dispatch = useDispatch();
  const testData = useSelector(tests);


  const test = () => dispatch(remoteUser());
  
  useEffect(() => {
   const resRemote = testData.find(test => test.query === 'remoteuser'); 
   if ( testData.length === 1 && resRemote.result ) {
    // userId
    dispatch(getUserId({ 'api_key': resRemote.data.api_key, 'app12_id': resRemote.data.id }));
    // userLogin
    dispatch(getUserLogin({ 'api_key': resRemote.data.api_key, 'login': `${resRemote.data.domain}\\${resRemote.data.login}` }));   
    // setLang
    dispatch(setLang({ 'api_key': resRemote.data.api_key, 'app12_id': resRemote.data.id, 'lang': resRemote.data.lang==='RU' ? "EN" : 'RU' }));
    // searchUser
    dispatch(searchUser({ 'api_key': resRemote.data.api_key, 'string': resRemote.data.email.split('@')[0] }));
    // getMainpage
    dispatch(getMainpage({ 'api_key': resRemote.data.api_key }));
   }
  }, [dispatch, testData]);

  // addToPrefers
  useEffect(() => {
    const resRemote = testData.find(test => test.query === 'remoteuser');
    const mainpage = testData.find(test => test.query === 'getMainpage');    
    const getRandSystem = () => {
      const mainpage = testData.find(test => test.query === 'getMainpage');
      const systems = mainpage.data.sections
        .filter(sections => sections.prefix !== 'FAVORITES' && sections.prefix !== 'TOP_ORDERS' && sections.prefix !== 'LK')
        .reduce((res, section) => [...res, ...section.systems], [])
        .map(syst => syst.asz22_id);
      const prefers = mainpage.data.sections
        .find(sections => sections.prefix === 'FAVORITES')
        .systems.map(syst => syst.asz22_id);
      const freeIdArr = systems.filter(id => !prefers.includes(id));
      return freeIdArr[Math.floor(Math.random() * freeIdArr.length)];
    }    

    if ( mainpage && mainpage.result !== null ) {
      if ( !testData.find(test => test.query === 'addToPrefers') ) {
        dispatch(addToPrefers({ 'api_key': resRemote.data.api_key, 'app12_id': resRemote.data.id, 'asz22_id': getRandSystem()}));     
      }
    }
  }, [dispatch, testData]);
  
  // delToPrefers
  useEffect(() => {
    const resRemote = testData.find(test => test.query === 'remoteuser');
    const addToPrefers = testData.find(test => test.query === 'addToPrefers'); 
    const mainpage = testData.find(test => test.query === 'getMainpage');

    if ( addToPrefers && addToPrefers.result !== null ) {

      const before = mainpage.data.sections.find(sections => sections.prefix === 'FAVORITES').systems.map(syst => syst.asz22_id);
      const after = addToPrefers.data.sections.find(sections => sections.prefix === 'FAVORITES').systems.map(syst => syst.asz22_id);
      const freeIdArr = after.find(id => !before.includes(id));

      if ( !testData.find(test => test.query === 'delToPrefers') )
        dispatch(delToPrefers({ 'api_key': resRemote.data.api_key, 'app12_id': resRemote.data.id, 'asz22_id': freeIdArr}));
    }
  }, [dispatch, testData]);




  return (
    <section className={'mainpage'} >

      { !testData.length 
        ? <button type="button" onClick={ test } className="btnStart">Test</button> 
        : <ul className="testUl">
            { testData.map((item, index) => <li key={index} className="testLi">
              <label className="testName">{item.name}</label>
              {item.result === null ? <TestLoader/> 
                : item.result 
                  ? <FontAwesomeIcon icon={faCheck} className="success"/>
                  : <FontAwesomeIcon icon={faBan} className="fail"/>
              }
            </li>) }
          </ul>
      }

    </section>
  )
}

