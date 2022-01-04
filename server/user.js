const users= [];

function adduser({id, name, room})
{
    name=name.trim().toLowerCase();
    room=room.trim().toLowerCase();
    const userfind=users.find((user)=>(user.name==name && user.room==room));
    if(userfind)
        return {error:"Existing user already"};
    if(!name || !room)
        return {error:"Please enter the name or roll number"};
    const user = {id,name,room};
    users.push(user);
    return {user};
}

function deleteuser(id)
{
    const index = users.findIndex((user)=>(user.id==id));
    if(index!=-1)
        return users.splice(index,1)[0];
}

function getuser(id)
{
    const index = users.find((user)=>(user.id==id));
    if(index!=-1)
        return users[index];
}

function getuserinroom(room)
{
    var user_array=[];
    for(var i=0;i<users.length;i++)
    {
        if(users.room==room)
        {
            user_array.push(users[i]);
        }
    }
    return user_array;
}

module.exports={adduser,deleteuser,getuserinroom,getuser};