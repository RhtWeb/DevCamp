import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getBootcamp } from '../../actions/bootcampAction';
import { getCourses } from '../../actions/courseAction';

const Bootcamp = () => {

	const dispatch = useDispatch();
	const { bootcampId } = useParams();
	
	useEffect(() => {
		dispatch(getBootcamp(bootcampId));
		dispatch(getCourses(bootcampId));
	}, [bootcampId]);

	const { bootcamp, course } = useSelector(({ bootcamp, course }) => ({ bootcamp, course }));
	const { current } = bootcamp;
	const allcourse = course.courses;

  return (
    <section className="bootcamp mt-5">
       <div className="container pt-4">
         <div className="row">
					 {/* Main col  */}
           <div className="col-md-8">
						<h1>{current?.name}</h1>
						{/* Description  */}
						<p>{current?.description}</p>
						{/* <!-- Avg cost --> */}
						<p className="lead mb-4">Average Course Cost: 
							<span className="text-primary"> {" "}
								{/* {current?.location?.country === "IN" ? <>&#x20B9;</> : "$"} */}
								${current?.averageCost}
							</span>
						</p>
						{/* <!-- Courses --> */}
						{allcourse.length === 0 && <div className="card mb-3"><h5 className="card-header bg-danger text-white">No Cousese Availiable</h5></div>}
						{allcourse.length !== 0 && allcourse.map((course) => (
							<div key={course._id} className="card mb-3">
								<h5 className="card-header bg-primary text-white">{course.title}</h5>
								<div className="card-body">
									<h5 className="card-title">Duration: {course.weeks} Weeks</h5>
									<p className="card-text">{course.description}</p>
									<ul className="list-group mb-3">
										<li className="list-group-item">Cost: ${course.tuition} USD</li>
										<li className="list-group-item">Skill Required: {course.minimumSkill}</li>
										<li className="list-group-item">Scholarship Available: <i className="fas fa-check text-success"></i> </li>
									</ul>
								</div>
							</div>
						))}
						
					 </div>
					 {/* <!-- Sidebar --> */}
           <div className="col-md-4">
						 {/* <!-- Image --> */}
						 <img src="" className="img-thumbnail" alt="" />
						 {/* <!-- Rating --> */}
						 <h1 className="text-center my-4"><span className="badge badge-secondary badge-success rounded-circle p-3">8.8</span> Rating</h1>
						 {/* <!-- Buttons --> */} 
						 <Link to={`reviews`} className="btn btn-dark btn-block my-3"><i className="fas fa-comments"></i>  Read Reviews</Link>
						 <Link to={`addreview`} className="btn btn-light btn-block my-3"><i className="fas fa-pencil-alt"></i>  Write a Review</Link>
						 <Link to="#" target="_blank" className="btn btn-secondary btn-block my-3"><i className="fas fa-globe"></i>  Visit Website</Link>
						 {/* <!-- Map --> */}
						 <div id='map' style={{width: "100%", height: "300px"}}></div>
						 {/* <!-- Perks --> */}
             <ul className="list-group list-group-flush" className="mt-4">
                <li className="list-group-item">
								 <i className="fas fa-check text-success"></i> Housing
								</li>
                <li className="list-group-item"><i className="fas fa-check text-success"></i> Job Assistance</li>
                <li className="list-group-item"><i className="fas fa-times text-danger"></i> Job Guarantee</li>
              </ul>
           </div>
         </div>
       </div>
    </section>
  )
}

export default Bootcamp
