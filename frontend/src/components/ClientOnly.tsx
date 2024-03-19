const ClientOnly = (WrappedComponent) => {
    return (props) => {
        if (typeof window === 'undefined') {
            return null;
        }
        return <WrappedComponent {...props} />;
    };
};

export default ClientOnly