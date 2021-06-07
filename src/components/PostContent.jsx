import React, { Component } from "react"

import styles from "../assets/css/components/postContent.module.scss"

class PostContent extends Component {
    state = {}
    render() {
        return (
            <div className={styles.postContent}>
                <p>post Content</p>
            </div>
        )
    }
}

export default PostContent
