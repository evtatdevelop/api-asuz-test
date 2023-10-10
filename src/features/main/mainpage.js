import React, { useEffect } from "react";
import './mainpage.scss';
import { useSelector, useDispatch } from "react-redux";
import { remoteUser, getUserId, getUserLogin, setLang, searchUser } from "./mainpageSlice";
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
    dispatch(getUserId({'api_key': resRemote.data.api_key, 'app12_id': resRemote.data.id}));
    // userLogin
    dispatch(getUserLogin({'api_key': resRemote.data.api_key, 'login': `${resRemote.data.domain}\\${resRemote.data.login}`}));   
    // setLang
    dispatch(setLang({'api_key': resRemote.data.api_key, 'app12_id': resRemote.data.id, 'lang': resRemote.data.lang==='RU' ? "EN" : 'RU' }));
    // searchUser
    dispatch(searchUser({'api_key': resRemote.data.api_key, 'string': resRemote.data.email.split('@')[0] }));
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

