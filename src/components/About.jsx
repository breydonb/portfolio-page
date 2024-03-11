import React from 'react';
import "../App.css";

function about() {
    return (
        <div>
            <h2 className='text-center'>About Me</h2>
            <div className='container'>
                <div className='row justify-content-around'>
                    <div className='col-md-6 d-flex justify-content-center'>
                        <img src='img/me-full.jpg' alt='my portrait' className='about-picture rounded-circle'/>
                    </div>
                    <div className='col-sm-6 p-4'>
                        <p className='text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus turpis id ornare consequat. Praesent euismod metus est, et faucibus mi condimentum quis. Integer ullamcorper tincidunt facilisis. Praesent in erat vitae arcu pulvinar suscipit. Suspendisse consequat nec odio maximus interdum. Nullam porttitor velit diam, id semper metus tempor at. Sed ut dolor blandit, sagittis velit non, porttitor magna. Duis posuere sed quam nec commodo. In sed pulvinar nibh.</p>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='d-flex justify-content-around align-items-end p-4'>
                            <img src='img/Coffee-Cup-Silhouette.svg' width="75px"/> 
                            <p>I am an avid coffee drinker</p>
                        </div>
                    </div>
                </div>
                <div className='row justify-content-end'>
                    <div className='col-md-6'>
                        <div className='d-flex justify-content-around align-items-end p-4'>
                            <p>I enjoy listening to music all of the time</p>
                            <img src='img/headphones-listening.svg' width="75px"/> 
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='d-flex justify-content-around align-items-end p-4'>
                            <img src='img/dr-strange.svg' width="75px"/> 
                            <p>Dr. Strange is my favorite Marvel character</p>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <h2 className='text-center'>More About Me</h2>
            <p className='text-center p-3'>To better understand who I am as a person, I have provided some of my hobbies that I like to do outside of coding.</p>

            <div className='spacer about-peak'></div>

            <div className='bg-dark text-light'>
                <h3 className='text-center p-2'>Some of my Other Hobbies</h3>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <p className='text-center'>Playing guitar</p>
                        </div>
                        <div className='col-md-4'>
                            <p className='text-center'>Listening to music</p>
                        </div>
                        <div className='col-md-4'>
                            <p className='text-center'>Playing video games</p>
                        </div>
                        <div className='col-md-4'>
                            <p className='text-center'>Reading coding books</p>
                        </div>
                        <div className='col-md-4'>
                            <p className='text-center'>Watching Marvel movies</p>
                        </div>
                        <div className='col-md-4'>
                            <p className='text-center'>Spending time with friends and family</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='spacer about-reverse'></div>

        </div>
    )
}

export default about
