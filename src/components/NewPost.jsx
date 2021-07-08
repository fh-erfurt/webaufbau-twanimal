import {
	faCircleNotch,
	faImages,
	faTimes,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { Component } from "react"
import style from "../assets/css/components/newPost.module.scss"
import config from "../config"
import { authenticationService } from "../services/authenticationService"

class NewPost extends Component {
	constructor(props) {
		super(props)

		this.state = {
			user: authenticationService.getUser(),
			attachements: [],
			content: "",
			isSubmitting: false,
		}

		this.apiToken = authenticationService.getAPIToken()
	}

	handleFile = (event) => {
		if (this.state.attachements.length >= 4) return

		const files = event.target.files
		const attachements = this.state.attachements

		for (let i = 0; i < files.length; i++) {
			const file = files.item(i)

			attachements.push({
				file: file,
				preview: URL.createObjectURL(file),
			})

			if (attachements.length >= 4) break
		}

		this.setState({
			attachements: attachements,
		})
	}

	removeFile = (index) => {
		const attachements = this.state.attachements

		const file = attachements[index]

		URL.revokeObjectURL(file.preview)

		attachements.splice(index, 1)

		this.setState({
			attachements: attachements,
		})
	}

	submitPost = async (event) => {
		event.preventDefault()

		if (this.state.isSubmitting || (this.state.attachements.length === 0 && this.state.content.length === 0)) return

		this.setState({ isSubmitting: true })

		const text = this.state.content
		const attachements = this.state.attachements

		const formData = new FormData()
		formData.append("text", text)

		if(this.props.replyToPost) formData.append("replyToId", this.props.replyToPost.id)

		for (const attachement of attachements)
			formData.append("attachements", attachement.file)

		const response = await fetch(`${config.apiHost}/post/new`, {
			method: "post",
			headers: {
				Authorization: `Bearer ${this.apiToken}`,
			},
			body: formData,
		})

		if (response.ok) {
			const post = await response.json()

			this.props.onNewPost(post)

			for (const attachement of attachements)
				URL.revokeObjectURL(attachement.preview)

			this.setState({
				isSubmitting: false,
				attachements: [],
				content: "",
			})
		} else {
			const error = await response.json()
			console.log(error)
		}
	}

	render() {
		return (
			<React.Fragment>
				<form className={style.newPost} onSubmit={this.submitPost}>
					<div className={style.newPostRow}>
						<img
							className={style.profileImage}
							src={this.state.user.profilePictureUrl}
							alt="profileImage"
						/>
						<div className={style.postContent}>
							<textarea
								placeholder="Was gibts neues?"
								value={this.state.content}
								onChange={(e) =>
									this.setState({ content: e.target.value })
								}
							></textarea>
							{this.state.attachements.length > 0 && (
								<div className={style.attachements}>
									{this.state.attachements.map(
										(attachement, index) => {
											return (
												<div
													key={index}
													className={
														style.attachement
													}
													style={{
														backgroundImage: `url(${attachement.preview})`,
													}}
												>
													<div
														onClick={() =>
															this.removeFile(
																index
															)
														}
													>
														<FontAwesomeIcon
															icon={faTimes}
														/>
													</div>
												</div>
											)
										}
									)}
								</div>
							)}
						</div>
					</div>
					<div className={style.actionRow}>
						{this.state.attachements.length < 4 && (
							<div className={style.imageButton}>
								<FontAwesomeIcon
									className={style.icons}
									icon={faImages}
								/>
								<input
									type="file"
									accept="image/*"
									multiple
									onChange={this.handleFile}
								/>
							</div>
						)}
						<div className={style.spacer}></div>
						<button className={ (this.state.attachements.length === 0 && this.state.content.length === 0) ? style.disabled : null }>
							{this.state.isSubmitting && (
								<span>
									<FontAwesomeIcon
										spin={true}
										icon={faCircleNotch}
									/>
									&nbsp;
								</span>
							)}
							Wuff
						</button>
					</div>
				</form>
			</React.Fragment>
		)
	}
}

export default NewPost
