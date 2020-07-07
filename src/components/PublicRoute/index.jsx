import React from "react";
import PropTypes from "prop-types";

const PublicRoute = ({
  context: Context,
  component: Component,
  permissions,
  routerProps,
  ...props
}) => {
  if (Context) {
    return (
      <Context>
        <Component
          routerPermissions={permissions}
          routerProps={routerProps}
          {...props}
        />
      </Context>
    );
  }

  return (
    <Component
      routerPermissions={permissions}
      routerProps={routerProps}
      {...props}
    />
  );
};

PublicRoute.propTypes = {
  permissions: PropTypes.instanceOf(Array),
  component: PropTypes.instanceOf(Object).isRequired,
  routerProps: PropTypes.instanceOf(Object),
};

PublicRoute.defaultProps = {
  routerProps: {},
  permissions: [],
};

export default PublicRoute;
