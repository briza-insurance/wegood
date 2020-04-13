import { today } from '../../time'

describe('Common - Date', () => {
  // Get today in ISO, reset hours
  test('today', () => {
    expect(today().getTime())
      .toBe(new Date((new Date()).setHours(0, 0, 0, 0)).getTime())
  })
})
