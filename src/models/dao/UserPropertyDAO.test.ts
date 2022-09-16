import UserProperty from "../entities/UserProperty";
import UserPropertyDAO from "./UserPropertyDAO";

describe('Tests over new property insertion', () => {
  beforeEach(() => {
    const userPropertyDAO = new UserPropertyDAO('user.properties');
    userPropertyDAO.clear();
  });
  
  test('It should contain the new property after add it to the properties file', () => {
    const userProperty: UserProperty = {
      key: 'nome',
      value: 'paulo'
    };
    
    const userPropertyDAO = new UserPropertyDAO('user.properties');
    userPropertyDAO.add(userProperty);
    expect(userPropertyDAO.read()).toBe('nome=paulo\n');
  });

  test('It should contain all the new properties after add them to the properties file', () => {
    const userProperties: UserProperty[] = [
      {
        key: 'nome',
        value: 'paulo'
      },
      {
        key: 'idade',
        value: 20
      },
      {
        key: 'eh_estudante',
        value: true
      }
    ];

    const userPropertyDAO = new UserPropertyDAO('user.properties');
    userProperties.forEach((userProperty) => userPropertyDAO.add(userProperty));
    expect(userPropertyDAO.read()).toBe('nome=paulo\nidade=20\neh_estudante=true\n');
  });
});

describe('Tests over querying properties', () => {
  beforeEach(() => {
    const userPropertyDAO = new UserPropertyDAO('user.properties');
    userPropertyDAO.clear();
  });
  
  test('It should return null when key is not found', () => {
    const userProperties: UserProperty[] = [
      {
        key: 'nome',
        value: 'paulo'
      },
      {
        key: 'idade',
        value: 20
      },
      {
        key: 'eh_estudante',
        value: true
      }
    ];

    const userPropertyDAO = new UserPropertyDAO('user.properties');
    userProperties.forEach((userProperty) => userPropertyDAO.add(userProperty));
    expect(userPropertyDAO.get('namorada')).toBe(null);
  });

  test('It should return correct value when key is found', () => {
    const userProperties: UserProperty[] = [
      {
        key: 'nome',
        value: 'paulo'
      },
      {
        key: 'idade',
        value: 20
      },
      {
        key: 'eh_estudante',
        value: true
      }
    ];

    const userPropertyDAO = new UserPropertyDAO('user.properties');
    userProperties.forEach((userProperty) => userPropertyDAO.add(userProperty));
    expect(userPropertyDAO.get('idade')).toBe('20');
  });
});