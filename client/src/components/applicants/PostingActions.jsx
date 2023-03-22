import '../../styles/Tabs.css'
import React from "react";

const PostingActions = ({canInterview, canAccept, canRescind}) => (
    <div style={{display: 'flex', marginTop: 20, justifyContent: 'space-evenly'}}>
        {canInterview && (<button className="Button black">Invite to Interview</button>)}
        {canAccept && (<button className="Button black">Accept</button>)}
        {canRescind && (<button className="Button red">Rescind</button>)}
    </div>
)

export default PostingActions