const followModel = require('../models/follow.model')
const userModel = require('../models/user.model')

async function followUserController(req,res){
    const followerUsername = req.user.username // My Id
    const followingUsername = req.params.username //The friend we want to folow

    //create a follow record
    const followRecord = await followModel.create({
        follower : followerUsername,
        following : followingUsername
    })

    //check if the user is trying to follow himself
    if(followerUsername === followingUsername){
        return res.status(400).json({
            message : "You cannot follow Yourself!"
        })
    }

    //check if the user exists
    const isFollowingExists = await userModel.findOne({
        username : followingUsername
    });

    if(!isFollowingExists){
        return res.status(404).json({
            message : "User Not exists"
        })
    }
    
    //check if the user is already following
    const isAlredyFollowing = await followModel.findOne({
        follower : followerUsername,
        following : followingUsername
    });

    if(isAlredyFollowing){
        return res.status(200).json({
            message : `you are alredy following ${followingUsername}`,
            follow : isAlredyFollowing
        })
    }
    
    //follow the user
    res.status(201).json({
        message:`you are now following ${followingUsername}`,
        follow : followRecord // sending the created record 
    })
}

/*  
    @routes DELETE api/users/unfollow/:username [protected]
    @description unfollow a user
    @req.params = {username}
    @res = {message:"User unfollowed successfully"}
*/
async function unfollowUserController(req,res){
    const followerUsername = req.user.username
    const followingUsername = req.params.username

    const ifUserFollowing = await followModel.findOne({
        follower : followerUsername,
        following : followingUsername,
    });

    if(!ifUserFollowing){
        return res.status(200).json({
            message : `You are not following ${followingUsername}`
        })
    }

    await followModel.findByIdAndDelete(ifUserFollowing._id)

    res.status(200).json({
        message : `you have unfollowed ${followingUsername}`
    })
}

module.exports = {
    followUserController,
    unfollowUserController
}