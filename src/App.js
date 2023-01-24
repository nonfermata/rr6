import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Outlet,
    Link,
    useParams,
    Navigate
} from "react-router-dom";

const users = [
    {
        id: "1",
        name: "user1"
    },
    {
        id: "2",
        name: "user2"
    },
    {
        id: "3",
        name: "user3"
    },
    {
        id: "4",
        name: "user4"
    },
    {
        id: "5",
        name: "user5"
    }
];

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="users" element={<UsersLayout />}>
                    <Route path="" element={<UsersListPage />} />
                    <Route path=":userId/profile" element={<UserPage />} />
                    <Route path=":userId/edit" element={<Edit />} />
                    <Route path="*" element={<Navigate to="" />} />
                </Route>
                <Route path="*" element={<Navigate to="" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

const HomePage = () => {
    return (
        <>
            <h1>Home Page</h1>
            <Link to="users">User List Page</Link>
        </>
    );
};

const UsersLayout = () => {
    return <Outlet />;
};

const UsersListPage = () => {
    return (
        <>
            <h1>Users List Page</h1>
            <Link to="../..">Home Page</Link>
            <ul>
                {users.map((item) => (
                    <li key={item.id}>
                        <Link to={item.id + "/profile"}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

const UserPage = () => {
    const { userId } = useParams();
    return (
        <>
            <h1>User Page</h1>
            <ul>
                <li>
                    <Link to="..">Users List Page</Link>
                </li>
                <li>
                    <Link to={`../${userId}/edit`}>Edit this user</Link>
                </li>
            </ul>
            <p>{"userId: " + userId}</p>
        </>
    );
};

const Edit = () => {
    const { userId } = useParams();
    return (
        <>
            <h1>Edit User Page</h1>
            <ul>
                <li>
                    <Link to={`../${userId}/profile`}>User Profile Page</Link>
                </li>
                <li>
                    <Link to={`../${Number(userId) + 1}/profile`}>
                        Another User Page
                    </Link>
                </li>
                <li>
                    <Link to="..">User List Page</Link>
                </li>
            </ul>
        </>
    );
};
