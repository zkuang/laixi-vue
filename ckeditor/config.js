/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for a single toolbar row.
	config.toolbar = [
		// { name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		// { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		// { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		// { name: 'forms' },
		{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Strike', 'Underscore' ] },
		{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList', 'Blockquote', 'Outdent', 'Indent' ] },
		{ name: 'insert', items: [ 'Link', 'Image' ] }
		// { name: 'styles' },
		// { name: 'colors' },
		// { name: 'tools' },
		// { name: 'others' },
		// { name: 'about' }
	];

  // config.removePlugins= 'toolbar';

  // The default plugins included in the basic setup define some buttons that
	// are not needed in a basic editor. They are removed here.
	config.removeButtons = 'Cut,Copy,Paste,Undo,Redo,Anchor,Subscript,Superscript';

	// Dialog windows are also simplified.
	config.removeDialogTabs = 'link:advanced';
};
