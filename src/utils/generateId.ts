const generateId = () => `${new Date().toISOString()}-${Math.random() * 10}`;

export default generateId;
