'use client';

import { cubicBezier } from 'framer-motion';

/**
 * Framer Motion Ease In
 *
 * @param {number} Progress
 * @return {number} Eased Progress
 */
export const easeIn = cubicBezier(0.55, 0.055, 0.666, 0.19);
/**
 * Framer Motion Ease Out
 *
 * @param {number} Progress
 * @return {number} Eased Progress
 */
export const easeOut = cubicBezier(0.237, 0.666, 0.333, 1);
/**
 * Framer Motion Evil Ease
 *
 * @param {number} Progress
 * @return {number} Eased Progress
 */
export const evilEase = cubicBezier(0.666, 0, 0.237, 1);
/**
 * Framer Motion Elegant Ease
 *
 * @param {number} Progress
 * @return {number} Eased Progress
 */
export const elegantEase = cubicBezier(0.18, 0.58, 0.19, 1);
