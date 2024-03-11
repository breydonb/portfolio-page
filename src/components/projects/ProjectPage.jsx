import Data from '../data/ExpandedProjectData.json';
import 'bootstrap/dist/css/bootstrap.css';
import '../../App.css'
import React from 'react';

function ProjectPage() {
    return (
        <div className="container p-4">
            <h2 className='text-center'>My Projects</h2>
            <div className="row">
                {Data.map(project =>{
                            return(
                                <div className='col-md-4'>
                                    <div className='card mb-4 box shadow bg-dark'>
                                        <img className='card-img-top' src={project.img} alt={project.alt} />
                                        <div className='card-body text-light'>
                                            <h5 class="card-title">{project.title}</h5>
                                            <p className='card-text'>{project.desc}</p>
                                            <a href={project.link} class="btn btn-primary btn-lg active" role="button" aria-pressed="true" target="_blank" rel="noreferrer">See the Source Code!</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
            </div>
        </div>
    )
}

export default ProjectPage
