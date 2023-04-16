import {render, screen, cleanup} from '@testing-library/react';
import App from '../App';

test('should render app component', () => {
    render(<App/>)
    // const todoElement = screen.getByTestId('footer-1');
    // expect(todoElement).toBeInTheDocument()
    // not sure what this is for
})
