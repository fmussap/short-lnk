import React from 'react'

import LinksList from './LinksList'
import Header from './Header'
import AddLink from './AddLink'
import LinksListFilter from './LinksListFilter'

const Link = () => {
  return (
    <div>
      <Header title='My links' />
      <div className='page-content'>
        <LinksListFilter />
        <AddLink />
        <LinksList />
      </div>
    </div>
  )
}

export default Link
