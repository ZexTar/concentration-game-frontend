import React from 'react';
import PropTypes from 'prop-types';

class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: '',
		};
	}

	onEmailChange = (event) => {
		this.setState({ signInEmail: event.target.value });
	}

	onPasswordChange = (event) => {
		this.setState({ signInPassword: event.target.value });
	}

	onSubmitSignIn = () => {
		const { routeChange, loadUser } = this.props;
		const { signInEmail, signInPassword } = this.state;
		fetch('http://localhost:3000/signin', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: signInEmail,
				password: signInPassword,
			}),
		})
			.then(response => response.json())
			.then((data) => {
				if (data.id) {
					loadUser(data);
					routeChange('memorygame');
				}
			})
			.catch(() => 'wrong credentials');
	}

	render() {
		const { routeChange } = this.props;
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
					<div className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f1 fw6 ph0 mh0" role="presentation">Sign In</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
								<input
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="email"
									name="email-address"
									id="email-address"
									onChange={this.onEmailChange}
								/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
								<input
									className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="password"
									name="password"
									id="password"
									onChange={this.onPasswordChange}
								/>
							</div>
						</fieldset>
						<div className="">
							<input
								onClick={() => this.onSubmitSignIn()}
								className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
								type="submit"
								value="Sign in"
							/>
						</div>
						<div className="lh-copy mt3">
							<p onClick={() => routeChange('register')} className="f6 link dim black db pointer" role="presentation">Register</p>
						</div>
					</div>
				</main>
			</article>
		);
	}
}

Signin.propTypes = {
	routeChange: PropTypes.func.isRequired,
	loadUser: PropTypes.func.isRequired,
};

export default Signin;
