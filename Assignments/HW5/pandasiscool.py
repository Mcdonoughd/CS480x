
northeast_div1 = ['MA', 'NH', 'VT', 'RI', 'CT', 'ME']
northeast_div2 = ['PA', 'NY', 'NJ']

midwest_div1 = ['IL', 'IN', "MI", 'OH', 'WI']
midwest_div2 = ['IA', 'KS', 'MN', 'MO', 'NE', 'ND', 'SD']

south_div1 = ['DE', 'FL', 'GA', 'MD', 'NC', 'SC', 'VA', 'DC', 'WV']
south_div2 = ['AL', 'KY', 'MI', 'TN']
south_div3 = ['AR', 'LA', 'OK', 'TX']

west_div1 = ['AZ', 'CO', 'ID', 'MT', 'NV', 'NM', 'UT', 'WY']
west_div2 = ['AK', 'CA', "WA", 'OR']

islands = ['HI', 'PR', 'VI']


def getRegion(state):
    if state in northeast_div1 + northeast_div2:
        return 'Northeast'
    elif state in midwest_div1 + midwest_div2:
        return 'Midwest'
    elif state in south_div1 + south_div2 + south_div3:
        return 'South'
    elif state in west_div1 + west_div2:
        return 'West'
    elif state in islands:
        return 'Islands'

