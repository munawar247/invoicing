declare module 'StoreApp/Store' {
  const App: React.ComponentType;
  export const StoreProvider: React.ComponentType<Any>;
  export const { useAppState };
  export const { useDispatchActions };
}

declare module 'Tenant/App' {
  const App: React.ComponentType;
  export default App;
}

declare module 'Tendering/App' {
  const App: React.ComponentType;
  export default App;
}

declare module 'Tracking/App' {
  const App: React.ComponentType;
  export default App;
}

declare module 'Orders/App' {
  const App: React.ComponentType;
  export default App;
}

declare module 'Invoices/App' {
  const App: React.ComponentType;
  export default App;
}
