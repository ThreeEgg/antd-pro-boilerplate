import React, { Component } from 'react'

import { setCookie } from '@/utils/cookie'
import { getParameter } from '@/utils/tools'
import CallStrategy from './components/CallStrategy'

class Home extends Component {

  state = {

  }

  componentDidMount() {
    console.log('window', window.location.href, getParameter('SHAREJSESSIONID'))
    const Id = getParameter('SHAREJSESSIONID')
    if (Id) {
      setCookie('SHAREJSESSIONID', Id)
    } else {
      setCookie('SHAREJSESSIONID', '7d07b3b4-da00-4a62-b524-30565c71faf0')
    }

    setCookie('copyFlag', 'true')
    setCookie('lxcs_ck_user_departmentcd', '')
    setCookie('lxcs_ck_user_departmenttopcd', '')
    setCookie('lxcs_ck_user_rolecds', '4a45872e-fece-4ab7-b3a8-5286cd6db6f9')

  }

  render() {
    return (
      <>
        <CallStrategy />
      </>
    )
  }
}

export default Home
