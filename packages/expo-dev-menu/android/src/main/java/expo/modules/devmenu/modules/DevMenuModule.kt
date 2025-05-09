package expo.modules.devmenu.modules

import com.facebook.react.bridge.*
import expo.modules.devmenu.DevMenuManager
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class DevMenuModule : Module() {
  val currentActivity
    get() = appContext.currentActivity ?: throw Exceptions.MissingActivity()

  override fun definition() = ModuleDefinition {
    Name("ExpoDevMenu")

    AsyncFunction<Unit>("openMenu") {
      DevMenuManager.openMenu(currentActivity)
    }

    AsyncFunction<Unit>("closeMenu") {
      DevMenuManager.closeMenu()
    }

    AsyncFunction<Unit>("hideMenu") {
      DevMenuManager.hideMenu()
    }

    AsyncFunction("addDevMenuCallbacks") { callbacks: ReadableArray ->
      DevMenuManager.registeredCallbacks.clear()

      val size = callbacks.size()
      for (i in 0 until size) {
        val callback = callbacks.getMap(i) ?: continue
        val name = callback.getString("name") ?: continue
        val shouldCollapse = if (callback.hasKey("shouldCollapse")) {
          callback.getBoolean("shouldCollapse")
        } else {
          true
        }
        DevMenuManager.registeredCallbacks.add(DevMenuManager.Callback(name, shouldCollapse))
      }
    }

    OnDestroy {
      DevMenuManager.registeredCallbacks.clear()
    }
  }
}
