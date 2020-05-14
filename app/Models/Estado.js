'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Estado extends Model {

  cidades () {
    return this.belongsToMany('App/Models/Cidade')
  }
}

module.exports = Estado
