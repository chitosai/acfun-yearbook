# -*- coding: cp936 -*-

import json

f = open('ac_article_60.json', 'r')
data_raw = f.readlines()[8]
f.close()

data = json.loads(data_raw)
data.sort(cmp=lambda x ,y:cmp(int(y['ac_article_hits']), int(x['ac_article_hits'])))
intend = '    ' * 4

f = open('output.txt', 'w')
f.write('\n' + intend + '<ul class="vlist">\n')

number = 1

for each in data:
	if number > 20 : break
	f.write(intend + '    <li>\n')
	f.write(intend + '        <span class="number">%s.</span>\n' % number)
	f.write(intend + '        <span class="hits">%s</span>\n' % each['ac_article_hits'])
	f.write(intend + '        <a class="link" href="%s" target="_blank">%s</a>\n' % (each['ac_article_link'].encode('utf-8'), each['ac_article_title'].encode('utf-8')))
	f.write(intend + '    </li>\n')
	number += 1

f.write(intend + '</ul>')
f.close()
