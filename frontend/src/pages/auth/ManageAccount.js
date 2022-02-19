import React from 'react'
import { Link } from 'react-router-dom'

const ManageAccount = () => {
  return (
    <div>
      <section class="container mt-5">
			<div class="row">
				<div class="col-md-8 m-auto">
					<div class="card bg-white py-2 px-4">
						<div class="card-body">
							<h1 class="mb-2">Manage Account</h1>
							<form>
								<div class="form-group">
									<label>Name</label>
									<input
										type="text"
										name="title"
										class="form-control"
										placeholder="Name"
										value="John Doe"
									/>
								</div>
								<div class="form-group">
									<label>Email</label>
									<input
										type="email"
										name="email"
										class="form-control"
										placeholder="Email"
										value="jdoe@gmail.com"
									/>
								</div>
								<div class="form-group">
									<div class="row">
										<div class="col-md-6">
											<input
												type="submit"
												value="Save"
												class="btn btn-success btn-block"
											/>
										</div>
										<div class="col-md-6">
											<Link
												to={`updatepassword`}
												class="btn btn-secondary btn-block">
													Update Password
											</Link>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
    </div>
  )
}

export default ManageAccount
