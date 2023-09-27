import React from 'react'

const NotFoundPage = () => {
  return (
    <>
     <div className="container">
            <div className="d-flex   flex-column justify-content-center align-items-center">

                <div className="image   ">
                         <img 
                         className="object-fit-contain w-50 d-block mx-auto"
                         src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000" alt="" />                 
                </div>

                <div className="">
                        <div className='  text-center'>
                            <h1 className='text-bold  ' style={ {fontSize:'60px'}}> Not Found</h1>
                            {/* <NavLink to="/">
                                <button className='btn btn-warning'> Go Back!</button>
                            </NavLink>
                             */}
                        </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default NotFoundPage