import {A, useRouteData, createRouteData} from "solid-start";
import Counter from "~/components/Counter";
import {createResource, For, Show} from "solid-js";
import axios from "axios";

type User = {
    userName:string;
}

export function routeData() {
    return createRouteData(async () => {
           const response = await axios.get<User[]>(import.meta.env.VITE_API_URL + "users");
           return response.data;
    });
}

export default function Users() {
    const users = useRouteData<typeof routeData>();
    // console.log(users(), "log");
    return (
        <main class="text-center mx-auto text-gray-700 p-4">
            <div>Users</div>
            {users.loading && <div>Loading...</div>}
            {/*<Show keyed when={users.loading} >*/}
                <ul>
                    <For each={users()}>
                        {(user) => <li>{user.userName}</li>}
                    </For>
                </ul>
            {/*</Show>*/}

        </main>
    );
}
