


import React from 'react'

function Footer() {
  return (
    <div className='bg-slate-950 min-h-screen px-4'>

        <section className='flex md:flex-row flex-col  '>

            <div className='flex flex-1 border-white border'>
                <h1 className='md:text-6xl text-4xl font-bold text-white'> Let’s make something
                great work together.</h1>

            </div>

            <div className='flex flex-1 border md:justify-center gap-20  justify-start border-white'>

                {/* service */}
                <div className='flex flex-col gap-3'>
                    <h2 className='font-bold text-2xl text-white'>Services</h2>

                    <div className='text-stone-200 font-semibold list-none flex flex-col gap-1'>
                       <li>
                       <a>UI/UX Design</a>
                       </li>

                      <li>
                      <a>Web Design</a>
                      </li>

                    <li>    <a>Branding</a></li>
                   <li>
                   <a>Development</a>
                   </li>

                    </div>
                </div>
                {/* comany */}
                <div className='flex flex-col gap-3'>
                    <h2 className=' font-bold text-white text-2xl'>Company</h2>
                    <div className='text-stone-200 font-semibold list-none flex flex-col gap-1'>
                        <li>
                            <a>Home</a>
                        </li>
                        <li>
                          <a>  About us</a>
                        </li>
                        <li>
                            <a>Service</a>
                        </li>
                        <li>
                            <a>Portolio</a>
                        </li>
                        <li>
                            <a href="">
                            Let’s talk

                            </a>
                        </li>

                    </div>

                </div>

            </div>

        </section>


        {/* 2nd section
        
        */}

        <section className='grid lg:grid-cols-3 sm:grid-cols-2 md:py-10 py-14 gap-y-10'>

            <div className='flex flex-col gap-3'>
             <div>
             <h2 className='text-2xl font-bold text-white'>Call us</h2>
             </div>
             <div className='text-xl text-stone-300 font-semibold'>
                <h2>+1 234 567 8910</h2>
                  <h2>+1 987 654 3210</h2>
             </div>

            </div>

            <div className='flex flex-col gap-3'>
                <div className='text-2xl font-bold text-white'>
                    <h2>Send a message</h2>

                </div>

              <div className='text-xl font-semibold text-stone-300'>
              <h2>hello@example.com</h2>
                <h2>Hello@example.com</h2>

              </div>
            </div>
            {/* test */}

            <div className='flex flex-col gap-3'>

                <div className='text-2xl font-bold text-white'>
                    <h2>Newsletter</h2>
                </div>

                <div>
                    <input type='text' placeholder='Enter Your Email' className='border-b-4 border-white text-white text-left text-xl font-light px-10 ' />
                   
                </div>

            </div>






        </section>
        
        <section className='border border-t-white '>

            <h2 className='text-white text-xl font-semibold mt-4 opacity-80'>© {new Date().getFullYear()} · Plexify· Wordpress Theme by 7iquid</h2>
        </section>


    </div>
  )
}

export default Footer