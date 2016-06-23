'use babel'

import * as path from 'path'

describe('The hunspell provider for Atom Linter', () => {
  const lint = require('../lib/main').provideLinter().lint

  beforeEach(() => {
    waitsForPromise(() => {
      atom.packages.activatePackage('language-latex')
      return atom.packages.activatePackage('linter-hunspell')
    })
  })

  it('finds a spelling in "foo.tex"', () => {
    waitsForPromise(() => {
      return atom.workspace.open(path.join(__dirname, 'files', 'foo.tex')).then(editor => {
        return lint(editor, "text.tex.latex").then(messages => {
          expect(messages.length).toEqual(6)
          expect(messages[0].type).toEqual('Warning')
          expect(messages[0].text).toEqual('Gregor: Gregory, Greg, or, Greg-or, Gregorio, Regor, Oregon, Forego')
        })
      })
    })
  })
})
