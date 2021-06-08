
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.38.2' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\View\Components\LeftSide.svelte generated by Svelte v3.38.2 */

    const file$2 = "src\\View\\Components\\LeftSide.svelte";

    // (19:1) {#if clBool}
    function create_if_block(ctx) {
    	let section;
    	let span0;
    	let t1;
    	let span1;

    	const block = {
    		c: function create() {
    			section = element("section");
    			span0 = element("span");
    			span0.textContent = "Cliente Associado";
    			t1 = space();
    			span1 = element("span");
    			span1.textContent = "Cliente Não-Associado";
    			attr_dev(span0, "class", "svelte-dubckf");
    			add_location(span0, file$2, 20, 3, 517);
    			attr_dev(span1, "class", "svelte-dubckf");
    			add_location(span1, file$2, 21, 3, 551);
    			attr_dev(section, "class", "selecionarInserir svelte-dubckf");
    			add_location(section, file$2, 19, 2, 478);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, span0);
    			append_dev(section, t1);
    			append_dev(section, span1);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(19:1) {#if clBool}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let aside;
    	let img;
    	let img_src_value;
    	let t0;
    	let p;
    	let t2;
    	let nav;
    	let a;
    	let t4;
    	let span0;
    	let t6;
    	let span1;
    	let t8;
    	let span2;
    	let t10;
    	let t11;
    	let span3;
    	let t13;
    	let span4;
    	let t15;
    	let span5;
    	let mounted;
    	let dispose;
    	let if_block = /*clBool*/ ctx[0] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			aside = element("aside");
    			img = element("img");
    			t0 = space();
    			p = element("p");
    			p.textContent = `${userName}`;
    			t2 = space();
    			nav = element("nav");
    			a = element("a");
    			a.textContent = "linkn";
    			t4 = space();
    			span0 = element("span");
    			span0.textContent = "Home";
    			t6 = space();
    			span1 = element("span");
    			span1.textContent = "Dashboard";
    			t8 = space();
    			span2 = element("span");
    			span2.textContent = "Inserir Locação";
    			t10 = space();
    			if (if_block) if_block.c();
    			t11 = space();
    			span3 = element("span");
    			span3.textContent = "Retirar Locação";
    			t13 = space();
    			span4 = element("span");
    			span4.textContent = "Listar Locações";
    			t15 = space();
    			span5 = element("span");
    			span5.textContent = "Listar Clientes Não-Associados com Multa";
    			attr_dev(img, "class", "user-avatar svelte-dubckf");
    			if (img.src !== (img_src_value = src)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "user");
    			add_location(img, file$2, 11, 2, 201);
    			attr_dev(p, "class", "user-name svelte-dubckf");
    			add_location(p, file$2, 12, 2, 246);
    			attr_dev(a, "href", "InserirClienteA.svelte");
    			add_location(a, file$2, 14, 1, 307);
    			attr_dev(span0, "class", "svelte-dubckf");
    			add_location(span0, file$2, 15, 4, 354);
    			attr_dev(span1, "class", "svelte-dubckf");
    			add_location(span1, file$2, 16, 4, 376);
    			attr_dev(span2, "class", "svelte-dubckf");
    			add_location(span2, file$2, 17, 4, 403);
    			attr_dev(span3, "class", "svelte-dubckf");
    			add_location(span3, file$2, 24, 4, 611);
    			attr_dev(span4, "class", "svelte-dubckf");
    			add_location(span4, file$2, 25, 4, 644);
    			attr_dev(span5, "class", "svelte-dubckf");
    			add_location(span5, file$2, 26, 1, 674);
    			attr_dev(nav, "class", "nav-bar svelte-dubckf");
    			add_location(nav, file$2, 13, 2, 284);
    			attr_dev(aside, "class", "left-side svelte-dubckf");
    			add_location(aside, file$2, 10, 0, 173);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, aside, anchor);
    			append_dev(aside, img);
    			append_dev(aside, t0);
    			append_dev(aside, p);
    			append_dev(aside, t2);
    			append_dev(aside, nav);
    			append_dev(nav, a);
    			append_dev(nav, t4);
    			append_dev(nav, span0);
    			append_dev(nav, t6);
    			append_dev(nav, span1);
    			append_dev(nav, t8);
    			append_dev(nav, span2);
    			append_dev(nav, t10);
    			if (if_block) if_block.m(nav, null);
    			append_dev(nav, t11);
    			append_dev(nav, span3);
    			append_dev(nav, t13);
    			append_dev(nav, span4);
    			append_dev(nav, t15);
    			append_dev(nav, span5);

    			if (!mounted) {
    				dispose = listen_dev(span2, "click", /*handleInserirClick*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*clBool*/ ctx[0]) {
    				if (if_block) ; else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(nav, t11);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(aside);
    			if (if_block) if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const userName = "Pérsida Chita";
    const src = "images/avatar-icon.jpeg";

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("LeftSide", slots, []);
    	let clBool = false;

    	function handleInserirClick() {
    		$$invalidate(0, clBool = !clBool);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<LeftSide> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		userName,
    		src,
    		clBool,
    		handleInserirClick
    	});

    	$$self.$inject_state = $$props => {
    		if ("clBool" in $$props) $$invalidate(0, clBool = $$props.clBool);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [clBool, handleInserirClick];
    }

    class LeftSide extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LeftSide",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\View\Components\RightSide.svelte generated by Svelte v3.38.2 */

    const file$1 = "src\\View\\Components\\RightSide.svelte";

    function create_fragment$1(ctx) {
    	let aside;
    	let h1;
    	let t1;
    	let section;
    	let img0;
    	let img0_src_value;
    	let t2;
    	let img1;
    	let img1_src_value;
    	let t3;
    	let img2;
    	let img2_src_value;
    	let t4;
    	let img3;
    	let img3_src_value;
    	let t5;
    	let img4;
    	let img4_src_value;
    	let t6;
    	let img5;
    	let img5_src_value;
    	let t7;
    	let img6;
    	let img6_src_value;
    	let t8;
    	let img7;
    	let img7_src_value;
    	let t9;
    	let img8;
    	let img8_src_value;
    	let t10;
    	let img9;
    	let img9_src_value;
    	let t11;
    	let img10;
    	let img10_src_value;
    	let t12;
    	let img11;
    	let img11_src_value;

    	const block = {
    		c: function create() {
    			aside = element("aside");
    			h1 = element("h1");
    			h1.textContent = "Sistema de Aluguel de filmes";
    			t1 = space();
    			section = element("section");
    			img0 = element("img");
    			t2 = space();
    			img1 = element("img");
    			t3 = space();
    			img2 = element("img");
    			t4 = space();
    			img3 = element("img");
    			t5 = space();
    			img4 = element("img");
    			t6 = space();
    			img5 = element("img");
    			t7 = space();
    			img6 = element("img");
    			t8 = space();
    			img7 = element("img");
    			t9 = space();
    			img8 = element("img");
    			t10 = space();
    			img9 = element("img");
    			t11 = space();
    			img10 = element("img");
    			t12 = space();
    			img11 = element("img");
    			add_location(h1, file$1, 1, 2, 29);
    			if (img0.src !== (img0_src_value = "images/clueless.jpg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "Clueless");
    			attr_dev(img0, "class", "svelte-x0n1zm");
    			add_location(img0, file$1, 3, 4, 99);
    			if (img1.src !== (img1_src_value = "images/Avengers_Endgame.jpg")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "Avengers Endgame");
    			attr_dev(img1, "class", "svelte-x0n1zm");
    			add_location(img1, file$1, 5, 4, 156);
    			if (img2.src !== (img2_src_value = "images\\Frozen_2_poster.jpg")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "Frozen 2");
    			attr_dev(img2, "class", "svelte-x0n1zm");
    			add_location(img2, file$1, 6, 4, 223);
    			if (img3.src !== (img3_src_value = "images/minions-cartaz.jpg")) attr_dev(img3, "src", img3_src_value);
    			attr_dev(img3, "alt", "Minions");
    			attr_dev(img3, "class", "svelte-x0n1zm");
    			add_location(img3, file$1, 7, 4, 281);
    			if (img4.src !== (img4_src_value = "images/percy-jackson.jpg")) attr_dev(img4, "src", img4_src_value);
    			attr_dev(img4, "alt", "Percy Jackson");
    			attr_dev(img4, "class", "svelte-x0n1zm");
    			add_location(img4, file$1, 8, 4, 338);
    			if (img5.src !== (img5_src_value = "images/gods-of-egypt.jpg")) attr_dev(img5, "src", img5_src_value);
    			attr_dev(img5, "alt", "Gods of Egypt");
    			attr_dev(img5, "class", "svelte-x0n1zm");
    			add_location(img5, file$1, 9, 4, 399);
    			if (img6.src !== (img6_src_value = "images/mortal-kombat.jpg")) attr_dev(img6, "src", img6_src_value);
    			attr_dev(img6, "alt", "Mortal Kombat");
    			attr_dev(img6, "class", "svelte-x0n1zm");
    			add_location(img6, file$1, 10, 4, 460);
    			if (img7.src !== (img7_src_value = "images\\fatal-five.jpg")) attr_dev(img7, "src", img7_src_value);
    			attr_dev(img7, "alt", "Justice League: The Fatal Five");
    			attr_dev(img7, "class", "svelte-x0n1zm");
    			add_location(img7, file$1, 11, 4, 521);
    			if (img8.src !== (img8_src_value = "images\\shes-the-man.jpg")) attr_dev(img8, "src", img8_src_value);
    			attr_dev(img8, "alt", "She's the Man");
    			attr_dev(img8, "class", "svelte-x0n1zm");
    			add_location(img8, file$1, 12, 4, 597);
    			if (img9.src !== (img9_src_value = "images\\X-Men_Apocalypse.jpg")) attr_dev(img9, "src", img9_src_value);
    			attr_dev(img9, "alt", "X-Men Apocalypse");
    			attr_dev(img9, "class", "svelte-x0n1zm");
    			add_location(img9, file$1, 13, 4, 657);
    			if (img10.src !== (img10_src_value = "images\\wildchild.jpg")) attr_dev(img10, "src", img10_src_value);
    			attr_dev(img10, "alt", "Wildchild");
    			attr_dev(img10, "class", "svelte-x0n1zm");
    			add_location(img10, file$1, 14, 4, 724);
    			if (img11.src !== (img11_src_value = "images/Olympus-Has-Fallen-Poster.jpg")) attr_dev(img11, "src", img11_src_value);
    			attr_dev(img11, "alt", "Olympus Has Fallen");
    			attr_dev(img11, "class", "svelte-x0n1zm");
    			add_location(img11, file$1, 15, 4, 777);
    			attr_dev(section, "class", "posters");
    			add_location(section, file$1, 2, 2, 69);
    			attr_dev(aside, "class", "right-side svelte-x0n1zm");
    			add_location(aside, file$1, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, aside, anchor);
    			append_dev(aside, h1);
    			append_dev(aside, t1);
    			append_dev(aside, section);
    			append_dev(section, img0);
    			append_dev(section, t2);
    			append_dev(section, img1);
    			append_dev(section, t3);
    			append_dev(section, img2);
    			append_dev(section, t4);
    			append_dev(section, img3);
    			append_dev(section, t5);
    			append_dev(section, img4);
    			append_dev(section, t6);
    			append_dev(section, img5);
    			append_dev(section, t7);
    			append_dev(section, img6);
    			append_dev(section, t8);
    			append_dev(section, img7);
    			append_dev(section, t9);
    			append_dev(section, img8);
    			append_dev(section, t10);
    			append_dev(section, img9);
    			append_dev(section, t11);
    			append_dev(section, img10);
    			append_dev(section, t12);
    			append_dev(section, img11);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(aside);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("RightSide", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<RightSide> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class RightSide extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RightSide",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\View\App.svelte generated by Svelte v3.38.2 */
    const file = "src\\View\\App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let leftside;
    	let t;
    	let rightside;
    	let current;
    	leftside = new LeftSide({ $$inline: true });
    	rightside = new RightSide({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(leftside.$$.fragment);
    			t = space();
    			create_component(rightside.$$.fragment);
    			attr_dev(main, "class", "svelte-1mej2dw");
    			add_location(main, file, 4, 0, 72);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(leftside, main, null);
    			append_dev(main, t);
    			mount_component(rightside, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(leftside.$$.fragment, local);
    			transition_in(rightside.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(leftside.$$.fragment, local);
    			transition_out(rightside.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(leftside);
    			destroy_component(rightside);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ LeftSide, RightSide });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	},
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
