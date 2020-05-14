'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cidade extends Model {

  estaddos () {
    return this.belongsToMany('App/Models/Estado')
  }
}

module.exports = Cidade
