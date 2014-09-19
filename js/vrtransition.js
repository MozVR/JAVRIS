function VRTransition(containerEl, contentEl, config) {
  var el =  contentEl || document.createElement('div');
  el.classList.add("transition");
  el.classList.add("threed");
  el.width = "1200";
  el.height = "900";
  this.el = el;
  containerEl.appendChild(el);
  config = config || {};
  this.duration = config.duration || 1200;
  this.z = config.z || -1;
};

VRTransition.prototype.fadeIn = function (render) {
  var self = this;
  this.renderFadeIn = render || this.renderFadeIn;
  if (this.fadeOutInProgress) {
    this.fadeInPending = true;
    return;
  }
  this.fadeInInProgress = true;
  this.renderFadeIn(this.el);
  setTimeout(fadeInFinished, this.duration);
  function fadeInFinished() {
    self.fadeInInProgress = false;
    if (self.fadeOutPending) {
      self.fadeOut();
      self.fadeOutPending = false;
    }
  }
};

VRTransition.prototype.fadeOut = function (render) {
  var self = this;
  return new Promise( function(resolve, reject) {
    self.renderFadeOut = render || self.renderFadeOut;
    if (self.fadeInInProgress) {
      self.fadeOutPending = true;
      return;
    }
    self.fadeOutInProgress = true;
    self.renderFadeOut(self.el);
    setTimeout(fadeOutFinished, self.duration);
    function fadeOutFinished() {
      console.log('fade out finished');
      self.fadeOutInProgress = false;
      if (self.fadeInPending) {
        self.fadeIn();
        self.fadeInPending = false;
      }
      resolve();
    }
  });
};

VRTransition.prototype.renderFadeIn = function (el) {
  //el.classList.remove('fadeOut');
  el.classList.add('fadeIn');
};

VRTransition.prototype.renderFadeOut = function (el) {
  el.classList.remove('fadeIn');
  el.classList.add('fadeOut');
};

VRTransition.prototype.update = function () {
  this.el.style.transform = 'translate(-50%, -50%) translate3d(0, 0, ' + this.z  + 'rem) rotateY(0) rotateX(0)';
};