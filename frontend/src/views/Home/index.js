import React, { Component } from 'react'

import { setCookie } from '@/utils/cookie'
import CallStrategy from './components/CallStrategy'

class Home extends Component {

  state = {

  }

  componentDidMount() {
    setCookie('SHAREJSESSIONID', 'cb7344b0-0fea-405b-aef1-5c9184678821')
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
