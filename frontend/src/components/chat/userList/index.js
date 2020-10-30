import { List, Avatar, Button } from 'antd';

const UserList = () => {
    const data = [
        {"name":{"title":"Miss","first":"Weiwei","last":"Zhou"},"school":"Rice University","interest":"Reading"},
        {"name":{"title":"Mr","first":"Xiao","last":"Xia"},"school":"Rice University","interest":"Sports"},
        {"name":{"title":"Mr","first":"Zhijian","last":"Yao"},"school":"Rice University","interest":"Traveling"},
        {"name":{"title":"Mr","first":"Xuyang","last":"Xiao"},"school":"Rice University","interest":"Sports"},
        {"name":{"title":"Mr","first":"Wenlong","last":"Yan"},"school":"Rice University","interest":"Sports"},
        {"name":{"title":"Miss","first":"Xinru","last":"Xiao"},"school":"Rice University","interest":"Sports"},
    ]
    const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

    return (

        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
                <List.Item>

                    <List.Item.Meta
                        avatar={      <Avatar style={{ backgroundColor: ColorList[Math.floor(Math.random()*5)], verticalAlign: 'middle' }} size="large" gap={4}>
                            {item.name.first[0]}
                        </Avatar>}
                        description={item.name.first + " " +item.name.last}
                        title = {item.school}
                    />

                    <Button type="primary" shape="round" size='small'
                            onClick={() => alert("to complete")}>
                        Chat!
                    </Button>

                </List.Item>
            )}
        />



    )
}

export default UserList;