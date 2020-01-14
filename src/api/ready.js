// TODO: Move to helios/lib

import { getRegistry } from "heliosrx"
import { ALLOWED_GLOBAL_READY_FLAGS } from '@/flags'

/* =========================== Ready functions ============================= */

// -----------------------------------------------------------------------------
export function set_ready( name, ready = true) {
  const $registry = getRegistry()

  if ( ALLOWED_GLOBAL_READY_FLAGS.includes( name ) ) {

    $registry.commit('SET_GLOBAL_READY_STATE', {
      name: name,
      value: ready
    })

  } else {
    throw new Error('set_ready: name not allowed ' + name)
  }
}

// -----------------------------------------------------------------------------
export function rem_ready( name ) {
  const $registry = getRegistry()
  $registry.commit('REM_GLOBAL_READY_STATE', { name: name })
}

// -----------------------------------------------------------------------------
export function mapReady( ...args ) {
  const $registry = getRegistry()
  let map = {}
  args.forEach(name => {
    map['$ready_' + name] = function mappedGetter () {
      return $registry.getters.is_ready( name )
    }
  })
  return map
}

// -----------------------------------------------------------------------------
export function get_ready(name, id = null) {
  const $registry = getRegistry()
  if ( id ) {
    name = name + ':' + id
  }
  return $registry.getters.is_ready(name);
}

// -----------------------------------------------------------------------------
export function get_ready_count(name) {
  const $registry = getRegistry()
  return Object.keys($registry.state.ready).filter(entry => {
    return entry.startsWith( name + ':' )
  }).length
}
