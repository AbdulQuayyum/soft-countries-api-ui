import { Route, Redirect } from 'react-router-dom';

import { UseAuth } from '../Contexts/Auth.Context';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { authState } = UseAuth();

    return (
        <Route
            {...rest}
            render={props =>
                authState.token ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
};

export default ProtectedRoute;
