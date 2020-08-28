import React, { Component } from 'react'

import { setCookie } from '@/utils/cookie'
import { getParameter } from '@/utils/tools'
import CallStrategy from './components/CallStrategy'

class Home extends Component {

  state = {

  }

  componentDidMount() {
    const Id = getParameter('SHAREJSESSIONID')
    if (Id) {
      setCookie('SHAREJSESSIONID', Id)
    } else {
      setCookie('SHAREJSESSIONID', 'ebc72716-a922-4e8d-ae9f-a9f97df2e40c')
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
