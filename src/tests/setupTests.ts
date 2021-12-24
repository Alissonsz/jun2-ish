import '@testing-library/jest-dom/extend-expect';

jest.mock('socket.io-client');
const client = jest.requireMock('socket.io-client');

client.io = jest.fn().mockImplementation(() => ({
  on: jest.fn(),
}));
