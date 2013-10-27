/**
 * Slide-out widget for dojotoolkit
 * 
 * @author Lukáš Gergel pykasonet@gmail.com
 */
define(["dojo/_base/declare", "dojo/_base/fx", "dojo/query", "dojo/dom-class", "dojo/dom-geometry"], function(declare, fx, query, dCss, dGeom){
	
	var defaultHandleClass = "handler";
	var defaultPosition    = "left";

	var SlideOutPanel = {
		init: function(node, attrs){
			if(!node){
				return;
			}
			var domNode = node;
			var cfg = attrs || {};
			var position = dCss.contains(domNode, "right") ? "right" :
				dCss.contains(domNode, "top") ? "top" :
				dCss.contains(domNode, "bottom") ? "bottom" : "left";
			var animProp = {
				node: domNode,
				properties: {},
				onEnd: function(){
					dCss.toggle(domNode, "open");
				}
			};

			query("." + ((cfg.handler) ? cfg.handler : defaultHandleClass), node)
			.on("click", function(evt){
				var boxSize = dGeom.getMarginBox(domNode);
				var handleSize = dGeom.getMarginBox(evt.target);
				var contentSize = (position == "left" || position == "right") ?
					boxSize.w - handleSize.w : boxSize.h - handleSize.h;
				if(dCss.contains(domNode, "open")){
					animProp.properties[position] = -contentSize;
					fx.animateProperty(animProp).play();
				}else{
					animProp.properties[position] = 0;
					fx.animateProperty(animProp).play();
				}
			});
		}
	};
	return SlideOutPanel;
});