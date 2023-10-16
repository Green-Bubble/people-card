import renderer from 'react-test-renderer';
import {
  cleanup,
  render,
  screen,
  renderHook,
  act,
  fireEvent,
} from '@testing-library/react';
// import fireEvent from '@testing-library/user-event'
import { PeopleCard } from '../PeopleCard';
import useCounter from '../userCounter';

// jest.mock('../PeopleCard')

const PEOPLE_DATA = {
  id: 712,
  uid: '32bca3d9-8e59-4112-96a1-427aa0becf9d',
  password: 'eEzZUPuc7x',
  first_name: 'Lenard',
  last_name: 'Becker',
  username: 'lenard.becker',
  email: 'lenard.becker@email.com',
  avatar: 'https://robohash.org/veniamquiaest.png?size=300x300\u0026set=set1',
  gender: 'Non-binary',
  phone_number: '+91 269.293.4385 x86321',
  social_insurance_number: '708732342',
  date_of_birth: '1965-07-05',
  employment: {
    title: 'Internal Design Executive',
    key_skill: 'Leadership',
  },
  address: {
    city: 'East Edisonland',
    street_name: 'Schuppe Manor',
    street_address: '150 Fahey Drive',
    zip_code: '60804',
    state: 'Ohio',
    country: 'United States',
    coordinates: { lat: 0.365652409936601, lng: -12.672722971666047 },
  },
  credit_card: { cc_number: '5357-0715-3802-7995' },
  subscription: {
    plan: 'Platinum',
    status: 'Blocked',
    payment_method: 'Cash',
    term: 'Payment in advance',
  },
};

describe('PeopleCard Component', () => {
  beforeAll(() => {
    console.log('Initialize something before all');
  });
  it('changes the class when hovered', () => {
    const component = renderer.create(
      <PeopleCard people={PEOPLE_DATA}></PeopleCard>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    renderer.act(() => {
      tree.props.onMouseEnter();
    });

    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    renderer.act(() => {
      tree.props.onMouseLeave();
    });
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  afterEach(cleanup);

  it('PeopleCard changes the text when mouse hover', () => {
    const res = render(<PeopleCard people={PEOPLE_DATA} />);
    expect(res.queryByText('Non-binary')).toBeTruthy();

    expect(res.queryByText('708732342')).toBeNull();

    fireEvent.mouseEnter(res.container);

    // expect(res.queryByText('708732342')).toBeTruthy();
    // fireEvent.mouseLeave(res.container)

    // expect(res.queryByText('708732342')).toBeNull();
  });

  test('should increment counter', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  afterAll(() => {
    console.log('Release something before all');
  });
});
